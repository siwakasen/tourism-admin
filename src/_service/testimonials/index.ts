import { Api } from "../api";
import axios from "axios";

import {
  TestimonialReqI,
  TestimonialResI,
  ListTestimonialsReqI,
  ListTestimonialsResI,
  CreateTestimonialReqI,
  UpdateTestimonialReqI,
} from "../../__interface/testi.interface";
import { toast } from "react-toastify";
import { VITE_APP_REST_TESTI } from "../../_constants/constant";

export const TestimonialApi = Api.injectEndpoints({
  endpoints(build) {
    return {
      listTestimonials: build.query<ListTestimonialsResI, ListTestimonialsReqI>(
        {
          keepUnusedDataFor: 0,
          query: (params) => {
            const page = Number(params.page);
            const limit = Number(params.limit);
            const search = params.search;
            return {
              url: `${VITE_APP_REST_TESTI}/testimonials`,
              params: { page, limit, search },
            };
          },
        }
      ),
      getTestimonialById: build.query<TestimonialResI, TestimonialReqI>({
        query: (params) => {
          const id = String(params.id);
          return {
            url: `${VITE_APP_REST_TESTI}/testimonials/${id}`,
          };
        },
      }),
      deleteTestimonial: build.mutation<TestimonialResI, TestimonialReqI>({
        query: (data) => {
          const id = String(data.id);
          return {
            url: `${VITE_APP_REST_TESTI}/testimonials/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useListTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useDeleteTestimonialMutation,
} = TestimonialApi;

export const CreateTestimonial = async (data: CreateTestimonialReqI) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("country", data.country);
    formData.append("message", data.message);

    const res = await axios.post(
      `${VITE_APP_REST_TESTI}/testimonials`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to create testimonial, reason : " + error);
    console.log(error);
  }
};

export const UpdateTestimonial = async (data: UpdateTestimonialReqI) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.image) formData.append("image", data.image);
    formData.append("country", data.country);
    formData.append("message", data.message);

    const res = await axios.post(
      `${VITE_APP_REST_TESTI}/testimonials/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    toast.error("Failed to update testimonial, reason : " + error);
    console.log(error);
  }
};
