import { useParams } from "react-router-dom";
import { useGetTestimonialByIdQuery } from "../../../_service/testimonials";
import { useEffect } from "react";
export const testimonialUpdateRoute = "/admin/testimonials/update/:id";
import { testimonialsRoute } from "..";
import { TestimonialForm } from "../../../components/forms/testimonial/testimonial.form";
export default function UpdateTestimonial(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetTestimonialByIdQuery({
    id: id ?? "",
  });
  useEffect(() => {}, [data, isLoading]);
  return !data ? (
    <></>
  ) : (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <TestimonialForm
          data={data.data}
          title={"Update New Testimonials"}
          route={testimonialsRoute}
        />
      </div>
    </div>
  );
}
