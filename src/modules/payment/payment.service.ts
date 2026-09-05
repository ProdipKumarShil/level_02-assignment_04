import prisma from "../../lib/prisma"
import { stripe } from "../../lib/stripe"
import { AppError } from "../../utils/app-error"


export const checkoutSessionService = async (customerId: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      bookingId: bookingId
    },
    include: {
      service: true,
      payments: true
    }
  })

  // console.log(booking)

  if (!booking) {
    throw new AppError(404, "Booking not found")
  }

  if (booking.user_id !== customerId) {
    throw new AppError(404, "This is not your booking")
  }
  if (booking.status === 'COMPLETED') {
    throw new AppError(404, "This booking is already completed")
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    metadata: { bookingId: booking.bookingId },
    success_url: "http://localhost:5000/payment/success",
    cancel_url: "http://localhost:5000/payment/cancel",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          unit_amount: Math.round(booking.totalAmount * 100),
          product_data: {
            name: `${booking.service.title}`
          }
        }
      }
    ]
  })


  await prisma.payment.upsert({
    where: {
      booking_id: booking.bookingId
    },
    create: {
      booking_id: booking.bookingId,
      amount: booking.totalAmount,
      transaction_id: session.id,
      method: "CARD",
      provider: "STRIPE"
    },
    update: {
      transaction_id: session.id,
      status: "PENDING"
    }
  })

  return { checkoutUrl: session.url }

}

export const completePaymentService = async (booking_id: string, transaction_id: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      booking_id: booking_id
    }
  })

  if (!payment || payment.status === 'COMPLETED') {
    return
  }

  const pResult = await prisma.$transaction([
    prisma.payment.update({
      where: {
        booking_id: booking_id
      },
      data: {
        status: "COMPLETED",
        transaction_id: transaction_id
      }
    }),
    prisma.booking.update({
      where: {
        bookingId: booking_id
      },
      data: {
        status: "COMPLETED"
      }
    })
  ])
}

export const getUserPaymentService = async (userId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      booking: {
        user_id: userId,
      },
    },
    include: {
      booking: {
        select: {
          bookingId: true,
          bookingDate: true,
          status: true,
          service: true
        },
      },
    }
  });

  return payments;
};

export const getPaymentByIdService = async (
  userId: string,
  userRole: string,
  paymentId: string
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      paymentId: paymentId,
    },
    include: {
      booking: {
        include: {
          service: true,
          user: {
            select: {
              userId: true,
              name: true,
              email: true,
            },
          },
          technician: {
            include: {
              user: {
                select: {
                  userId: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new AppError(404, "Payment record not found");
  }

  if (userRole === "ADMIN") {
    return payment;
  }

  const isCustomer = payment.booking.user_id === userId;

  const profile = await prisma.technicianProfile.findUnique({
    where: { user_id: userId },
  });
  const isTechnician =
    profile && payment.booking.technician_id === profile.technicianId;

  if (!isCustomer && !isTechnician) {
    throw new AppError(403, "You do not have permission to view this payment");
  }

  return payment;
};
