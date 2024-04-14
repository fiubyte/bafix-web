import {User} from "./User";
import {ServiceCategory} from "./ServiceCategory";

export interface Service {
    service_category_id: number;
    title: string;
    description: string;
    photo_url: string;
    availability_time_start: string;
    availability_time_end: string;
    availability_days: string;
    id: number;
    user: User;
    service_category: ServiceCategory;
    approved: boolean
}