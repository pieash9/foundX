"use client";

import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import dateToISO from "@/src/utils/dateToISO";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const CreatePostPage = () => {
  const methods = useForm({});

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data.dateFound),
    };

    console.log(postData);
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-2 py-2">
            <div className="min-w-fit flex-1">
              <FXInput name="title" label="Title" />
            </div>
            <div className="min-w-fit flex-1">
              <FXDatePicker name="dateFound" label="Found Date" />
            </div>
          </div>

          <Divider className="my-5" />

          <div className="my-5 flex justify-between items-center">
            <h1 className="text-xl">Owner verification questions</h1>
            <Button onClick={handleFieldAppend} type="button">
              Append
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center ">
                <FXInput name={`questions.${index}.value`} label="Question" />
                <Button onClick={() => remove(index)}>Remove</Button>
              </div>
            ))}
          </div>

          <Divider className="my-5" />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePostPage;
