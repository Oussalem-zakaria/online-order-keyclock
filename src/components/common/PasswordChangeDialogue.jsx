import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { set, z } from "zod";
import Form from "../form/Form";
import Input from "../form/Input";
import axios from "axios";

function PasswordChangeDialogue({ handleOpen, size }) {
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z
    .object({
      email: z
        .string()
        .email("Adresse e-mail invalide")
        .max(100, "Adresse e-mail ne doit pas dépasser 100 caractères"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"], // path to show error message
    });

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8036/auth/request-password-reset",
        new URLSearchParams({ email: formData.email }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setMessage("Email de réinitialisation envoyé !"), setIsLoading(false);
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div>
      <Dialog open={size === "sm"} size={"sm"} handler={() => handleOpen(null)}>
        <DialogHeader>{"Modifier mot de passe"}</DialogHeader>
        <DialogBody className="">
          <Form
            schema={formSchema}
            onSubmit={handleEdit}
            defaultValues={formData}
          >
            <div className="grid gap-6">
              <Input
                type="email"
                name="email"
                label="ADRESSE E-MAIL"
                value={formData.email}
                handleChange={handleChange}
              />
            </div>
            {isLoading && (
              <div className="flex justify-center">
                <Button variant="text" color="green" loading={true}>
                  Loading
                </Button>
              </div>
            )}
            {message && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {message}
              </div>
            )}

            <div className="flex space-x-4 pt-4 pb-2 justify-end">
              <Button variant="gradient" color={primaryColor} type="submit">
                <span>Soumettre</span>
              </Button>
              <Button
                variant="text"
                color="black"
                onClick={() => handleOpen(null)}
              >
                <span className="text-red-600">Annuler</span>
              </Button>
            </div>
          </Form>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default PasswordChangeDialogue;
