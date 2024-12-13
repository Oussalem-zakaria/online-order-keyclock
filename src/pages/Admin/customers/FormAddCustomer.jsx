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

const FormAddCustomer = ({
  handleOpen,
  data = null,
  btnName,
  isEdit = false,
}) => {
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
        })
        .catch((error) => {
          triggerNotification(
            "Erreur lors de la modification du client",
            "error"
          );
        });
    } else {
      dispatch(addCustomer(dataToSubmit))
        .unwrap()
        .then(() => {
          dispatch(getAllCustomers());
          triggerNotification("Client ajouté avec succès", "success");
        })
        .catch((error) => {
          triggerNotification("Erreur lors de l'ajout du client", "error");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    try {
      formSchema.parse(formData);
      // Soumettre les données du formulaire après validation
      const dataToSubmit = { ...formData };
      console.log("isEdit: ", isEdit);
      onSubmit(dataToSubmit);
      handleOpen(null);
    } catch (err) {
      console.log("Form validation error: ", err.errors);
    }
  };

  useEffect(() => {
    if (isEdit && data) {
      setFormData(data.data);
      console.log("data edit: ", data.data.id);
    }
    setIsDataLoaded(true);
  }, [data]);

  if (!isDataLoaded) {
    return <div className="flex justify-center align-middle">Loading ...</div>;
  }

  return (
    <Form schema={formSchema} onSubmit={handleSubmit} defaultValues={formData}>
      <div className="grid gap-4">
        <Input
          name="firstName"
          label="Prénom"
          placeholder="Prénom"
          onChange={handleChange}
          value={formData.firstName}
          required
        />
        <Input
          name="lastName"
          label="Nom"
          placeholder="Nom"
          onChange={handleChange}
          value={formData.lastName}
          required
        />

        <Input
          name="email"
          label="Email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>

      <div className="flex space-x-4 pt-10 pb-2 justify-end">
        <Button variant="gradient" color={"blue"} className="bg-blue-500" type="submit">
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
