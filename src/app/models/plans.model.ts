export interface PlanModel {
    plan_id: number;
    plan_name: string;
    plan_period: string;
    user_limit: number;
    telehealth: number;
    ben_health: number;
    number_of_rx: number;
    price_month: string;
    price_quarter: string;
    price_ninety_days: string;
    price_year: string;
    price_month_active: boolean;
    price_quarter_active: boolean;
    price_ninety_days_active: boolean;
    price_year_active: boolean;
    processing_fee: string;
    description: string;
    features: string;
    order_column: number;
    start_date: Date;
    end_date: Date;
}
