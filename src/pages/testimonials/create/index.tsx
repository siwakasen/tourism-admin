export const testimonialRouteCreate = "/admin/testimonials/create";
import { TestimonialForm } from "../../../components/forms/testimonial/testimonial.form";
import { testimonialsRoute } from "../index";
export default function CreateTestimonial(): React.ReactElement {
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <div className="border-2 rounded-2xl shadow-lg m-4 flex-grow bg-white overflow-auto">
        <TestimonialForm
          data={null}
          title={"Create New Testimonials"}
          route={testimonialsRoute}
        />
      </div>
    </div>
  );
}
