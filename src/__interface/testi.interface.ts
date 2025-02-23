export interface ListTestimonialsReqI {
    search: string;
    limit: number;
    page: number;
  }

export interface ListTestimonialsResI {
    data: Testimonial[]
    meta: Meta
  }

  export interface Testimonial {
    id: string;
    name: string;
    image: string;
    message: string;
    country: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }

  export interface Meta {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }


  export interface TestimonialReqI {
    id: string;
  }

  export interface TestimonialResI {
    data: Testimonial;
    message: string;
  }


  export interface CreateTestimonialReqI {
    name: string;
    image: File;
    message: string;
    country: string;
    access_token:string;
    }

    export interface UpdateTestimonialReqI extends TestimonialReqI, CreateTestimonialReqI {}
