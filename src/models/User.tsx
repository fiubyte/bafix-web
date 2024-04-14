export interface User {
    email: string;
    name: string;
    surname: string;
    profile_photo_url: string;
    document_number: string;
    street: string;
    street_number: string;
    postal_code: string;
    max_radius: number;
    phone_number: string;
    id: number;
    address_lat: string;
    address_long: string;
    approved: boolean;
}