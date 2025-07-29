// type Prop = {
//   message:
//     | string
//     | undefined
//     | FieldError
//     | Merge<FieldError, FieldErrorsImpl<any>>;
// };

export const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return <p className="text-sm text-red-500">{message}</p>;
};
