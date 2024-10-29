import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../form/FXForm";
import FXModal from "./FXModal";
import FXInput from "../form/FXInput";
import FXTextarea from "../form/FXTextarea";
import { Button } from "@nextui-org/button";

interface IProps {
  id: string;
  questions: string[];
}

const ClaimRequestModal = ({ id, questions }: IProps) => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
          Submit
        </Button>
      </FXForm>
    </FXModal>
  );
};

export default ClaimRequestModal;
