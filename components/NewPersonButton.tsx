import React, { useState } from "react";
import { Button } from "@mantine/core";
import { db } from "../pages/_app";
import { useForm } from "@mantine/hooks";
import { EditPersonModal } from "./EditPersonModal";
import { FancyAddButton } from "./FancyAddButton";

export function NewPersonButton() {
  const handleSubmit = () => {
    return form.onSubmit((values) => {
      collection.add(values);
      clearAndClose();
      form.reset();
    });
  };
  const collection = db.collection("conference/WwHJ20v2yZ3WG0fPvEKU/persons/");
  const [opened, setOpened] = useState(false);
  const initialValues = {
    Name: "",
    About: "",
    Image: "",
  };
  const form = useForm({ initialValues });
  return (
    <>
      <EditPersonModal
        opened={opened}
        setOpened={setOpened}
        handleSubmit={handleSubmit}
        form={form}
      />
      <FancyAddButton onClick={() => setOpened(true)}>
        Legg til ny person
      </FancyAddButton>

      {/* <Button onClick={() => setOpened(true)}>Legg til ny person</Button> */}
    </>
  );

  function clearAndClose() {
    form.setValues(initialValues);
    setOpened(false);
  }
}
