import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomer,
  getAllCustomers,
  updateCustomer,
} from "../../../redux/customerSlice";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ToastMessage from "../../../components/common/ToastMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const FormAddCustomer = ({
  handleOpen,
  data = null,
  btnName,
  isEdit = false,
}) => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const formSchema = z.object({
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne doit pas dépasser 50 caractères"),
    lastName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne doit pas dépasser 50 caractères"),
    email: z
      .string()
      .email("Adresse e-mail invalide")
      .max(100, "Adresse e-mail ne doit pas dépasser 100 caractères"),
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit && data ? data.data : undefined,
  });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  const onSubmit = (dataToSubmit) => {
    if (isEdit) {
      dispatch(
        updateCustomer({
          customerId: data.data.id,
          customerData: dataToSubmit,
        })
      )
      .unwrap()
      .then(() => {
        dispatch(getAllCustomers());
        triggerNotification("Client modifié avec succès", "success");
        handleOpen(null);
      })
      .catch(() => {
        triggerNotification("Erreur lors de la modification du client", "error");
      });
    } else {
      console.log("dataToSubmit addCustomer form :", dataToSubmit);
      dispatch(addCustomer({
        customerData: dataToSubmit,
      }))
      .unwrap()
      .then(() => {
        dispatch(getAllCustomers());
        triggerNotification("Client ajouté avec succès", "success");
        handleOpen(null);
      })
      .catch(() => {
        triggerNotification("Erreur lors de l'ajout du client", "error");
      });
    }
  };

  return (
    <Form 
      schema={formSchema} 
      onSubmit={onSubmit} 
      methods={methods} // Passez methods comme prop
      defaultValues={isEdit && data ? data.data : undefined}
    >
      <div className="grid gap-4">
        <Input
          name="firstName"
          label="Prénom"
          type="text"
          placeholder="Prénom"
          required
        />
        <Input
          name="lastName"
          label="Nom"
          type="text"
          placeholder="Nom"
          required
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <div className="flex space-x-4 pt-10 pb-2 justify-end">
        <Button 
          variant="gradient" 
          color={"blue"} 
          type="submit"
          className="rounded-lg"
        >
          <span>{btnName}</span>
        </Button>
        <Button
          variant="text"
          color="red"
          onClick={() => handleOpen(null)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
      </div>
      <ToastMessage message={notification.message} type={notification.type} />
    </Form>
  );
};

export default FormAddCustomer;