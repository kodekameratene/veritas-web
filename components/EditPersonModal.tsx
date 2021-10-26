import React from "react";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";

export function EditPersonModal(props: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => React.FormEventHandler<HTMLFormElement> | undefined;
  form: {
    values: { Name: string; About: string; Image: string };
    errors: Record<"Name" | "About" | "Image", boolean>;
    validate: () => boolean;
    reset: () => void;
    setErrors: React.Dispatch<
      React.SetStateAction<Record<"Name" | "About" | "Image", boolean>>
    >;
    setValues: React.Dispatch<
      React.SetStateAction<{ Name: string; About: string; Image: string }>
    >;
    setFieldValue: <
      K extends "Name" | "About" | "Image",
      U extends { Name: string; About: string; Image: string }[K]
    >(
      field: K,
      value: U
    ) => void;
    setFieldError: (field: "Name" | "About" | "Image", error: boolean) => void;
    validateField: (field: "Name" | "About" | "Image") => void;
    resetErrors: () => void;
    onSubmit: (
      handleSubmit: (values: {
        Name: string;
        About: string;
        Image: string;
      }) => any
    ) => (event?: React.FormEvent<Element> | undefined) => void;
  };
}) {
  const { opened, setOpened, handleSubmit, form } = props;
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Rediger person"
    >
      <form onSubmit={handleSubmit()}>
        <TextInput
          value={form.values.Name}
          onChange={(event) =>
            form.setFieldValue("Name", event.currentTarget.value)
          }
          placeholder="Kari Nordmann"
          label="Full name"
          required
        />
        <Textarea
          value={form.values.About}
          onChange={(event) =>
            form.setFieldValue("About", event.currentTarget.value)
          }
          placeholder="Kari er som de fleste nordmenn født med ski på bena. Foruten å stå på ski liker hun å snakke om..."
          label="About"
          required
          autosize
        />
        <TextInput
          value={form.values.Image}
          onChange={(event) =>
            form.setFieldValue("Image", event.currentTarget.value)
          }
          placeholder="https://some-image.mydomain.com"
          label="Image"
          required
        />
        <div style={{ display: "flex", paddingTop: 18 }}>
          <Button
            variant="filled"
            color="gray"
            onClick={() => setOpened(false)}
          >
            Avbryt
          </Button>
          <div style={{ width: 8 }}></div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
