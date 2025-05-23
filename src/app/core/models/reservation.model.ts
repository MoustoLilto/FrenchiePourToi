export interface Reservation {
    id: string;
    puppyId: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            postalCode: string;
            country: string;
        };
    };
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    payment: {
        depositAmount: number;
        totalAmount: number;
        paidAmount: number;
        paymentMethod: string;
        transactionId?: string;
        dueDate: string;
    };
    dates: {
        reservationDate: string;
        expectedDeliveryDate: string;
        actualDeliveryDate?: string;
    };
    notes: string;
    documents: {
        name: string;
        url: string;
        type: 'contract' | 'invoice' | 'certificate' | 'other';
    }[];
}

export interface ReservationForm {
    puppyId: string;
    customerInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: {
            street: string;
            city: string;
            postalCode: string;
            country: string;
        };
    };
    message: string;
    agreeToTerms: boolean;
}

export interface ReservationResponse {
    reservation: Reservation;
    success: boolean;
    message: string;
}
