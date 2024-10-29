import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../form/FXForm";
import FXModal from "./FXModal";
import FXInput from "../form/FXInput";
import FXTextarea from "../form/FXTextarea";
import { Button } from "@nextui-org/button";
import { useAddClaimRequest } from "@/src/hooks/claimRequest.hook";

interface IProps {
  id: string;
  questions: string[];
}

const ClaimRequestModal = ({ id, questions }: IProps) => {
  const { mutate: handleClaimRequest, isPending } = useAddClaimRequest();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const claimRequestData = {
      item: id,
      description: data.description,
      answers: Object.keys(data)
        .filter((formElement) => formElement.startsWith("answer"))
        .map((answer) => data[answer]),
    };

    handleClaimRequest(claimRequestData);
  };
  return (
    <FXModal
      buttonClassName="flex-1"
      buttonText="Claim Request"
      title="Claim Request"
    >
      <FXForm onSubmit={onSubmit}>
        {questions.map((question, i) => (
          <div className="mb-4" key={i}>
            <p className="mb-1">{question}</p>
            <FXInput label={`Answer - ${i + 1}`} name={`answer-${i + 1}`} />
          </div>
        ))}
        <FXTextarea label="Description" name="description" />

        <Button className="mt-4 w-full" type="submit">
          {isPending ? "Sending..." : "Send"}
        </Button>
      </FXForm>
    </FXModal>
  );
};

export default ClaimRequestModal;
