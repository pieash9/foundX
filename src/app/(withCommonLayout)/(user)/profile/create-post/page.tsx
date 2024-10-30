"use client";

import FXDatePicker from "@/src/components/form/FXDatePicker";
import FXInput from "@/src/components/form/FXInput";
import FXSelect from "@/src/components/form/FXSelect";
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
import { allDistict } from "@bangladeshi/bangladesh-address";
import { useGetCategories } from "@/src/hooks/categories.hook";
import { useState } from "react";
import FXTextarea from "@/src/components/form/FXTextarea";
import { AddIcon, TrashIcon } from "@/src/assets/icons";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";
import Loading from "@/src/components/ui/Loading";
import { useRouter } from "next/navigation";
import generateDescription from "@/src/services/imageDescription";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => ({ key: city, label: city }));

const CreatePostPage = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const { user } = useUser();

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoryOptions: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOptions = categoriesData?.data
      ?.sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

  const methods = useForm({});

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: dateToISO(data.dateFound),
      user: user?._id,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleCreatePost(formData);
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionGeneration = async () => {
    setIsLoading(true);
    try {
      const response = await generateDescription(
        imagePreviews[0],
        "write a description for social media post describing the given image that starts 'Found this...'",
      );

      methods.setValue("description", response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError("Failed to generate description");
    }
  };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
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

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXInput name="location" label="Location" />
              </div>
              <div className="min-w-fit flex-1">
                <FXSelect name="city" label="City" options={cityOptions} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXSelect
                  name="category"
                  label="Category"
                  options={categoryOptions}
                  disabled={!categorySuccess}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="block h-full w-full cursor-pointer rounded-xl border border-gray-500 pt-4 text-center duration-300 hover:border-gray-400"
                  htmlFor="image"
                >
                  Upload Image
                </label>
                <input
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  multiple
                  type="file"
                  id="image"
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="my-5 flex flex-wrap gap-5">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt="item"
                      className="h-full w-full rounded-md object-contain object-center"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FXTextarea label="Description" name="description" />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              {methods.getValues("description") && (
                <Button onClick={() => methods.resetField("description")}>
                  Clear
                </Button>
              )}
              <Button
                isLoading={isLoading}
                isDisabled={imagePreviews.length > 0 ? false : true}
                type="button"
                onClick={handleDescriptionGeneration}
              >
                {isLoading ? "Generating..." : "Generate Description"}
              </Button>
            </div>

            <Divider className="my-5" />

            <div className="my-5 flex items-center justify-between">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button isIconOnly onClick={handleFieldAppend} type="button">
                <AddIcon />
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-4">
                  <FXInput
                    name={`questions.${index}.value`}
                    label={`Question ${index + 1}`}
                  />
                  <Button isIconOnly onClick={() => remove(index)}>
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>

            <Divider className="my-5" />

            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreatePostPage;
