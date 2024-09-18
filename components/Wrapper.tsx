import { WrapperProps } from "@/Types";

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <section className={className}>
      <>{children}</>
    </section>
  );
};

export default Wrapper;
