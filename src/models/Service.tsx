import {User} from "./User";
import {ServiceCategory} from "./ServiceCategory";
import {Rate} from "./Rate";

export interface Service {
    service_category_id: number;
    title: string;
    description: string;
    photo_url: string;
    availability_time_start: string;
    availability_time_end: string;
    availability_days: string;
    avg_rate: number;
    requested_date: string;
    id: number;
    user: User;
    service_category: ServiceCategory;
    approved: boolean;
    rejected_message: string;
    rates: Rate[];
}