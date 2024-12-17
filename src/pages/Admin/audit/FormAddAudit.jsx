import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";
import ToastMessage from "../../../components/common/ToastMessage";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateOrder, getAllOrders, addOrder } from "../../../redux/ordersSlice";

const FormAddOrder = ({ handleOpen, data = null, btnName, isEdit = false }) => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Schéma Zod pour valider les commandes
  const formSchema = z.object({
    customerId: z
      .string()
      .min(1, "L'ID client est requis"),
    totalPrice: z
      .coerce.number()
      .min(0.01, "Le prix total doit être supérieur à 0"),
    status: z.enum(["Pending", "Completed", "Cancelled"]),
    orderItems: z
      .array(
        z.object({
          productId: z.string().min(1, "L'ID du produit est requis"),
          quantity: z.coerce.number().min(1, "La quantité doit être d'au moins 1"),
        })
      )
      .nonempty("La commande doit contenir au moins un produit"),
  });

  // Initialisation du formulaire
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit && data ? data.data : { orderItems: [{ productId: "", quantity: 1 }] },
  });

  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "orderItems" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  const onSubmit = (dataToSubmit) => {
    if (isEdit) {
      dispatch(
        updateOrder({
          orderId: data.data.id,
          orderData: dataToSubmit,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getAllOrders());
          triggerNotification("Commande modifiée avec succès", "success");
          handleOpen(null);
        })
        .catch(() => {
          triggerNotification("Erreur lors de la modification de la commande", "error");
        });
    } else {
      dispatch(
        addOrder({
          orderData: dataToSubmit,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getAllOrders());
          triggerNotification("Commande ajoutée avec succès", "success");
          handleOpen(null);
        })
        .catch(() => {
          triggerNotification("Erreur lors de l'ajout de la commande", "error");
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} methods={methods}>
      <div className="grid gap-4">
        <Input name="customerId" label="ID Client" placeholder="ID du client" type="text" />
        <Input
          name="total_price"
          label="Prix Total"
          placeholder="Prix total de la commande"
          type="number"
          step="0.01"
        />
        <Input name="status" label="Statut" placeholder="Statut" type="text" />

        {/* Champs pour les produits de la commande */}
        <div className="space-y-4">
          <label className="text-gray-700 font-bold">Articles de la commande</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-end space-x-4">
              <Input
                name={`orderItems.${index}.productId`}
                placeholder="ID du produit"
                label={`Produit ${index + 1}`}
                type="number"
              />
              <Input
                name={`orderItems.${index}.quantity`}
                placeholder="Quantité"
                type="number"
                label="Quantité"
              />
              <Button color="red" className="py-2.5" onClick={() => remove(index)}>
                Supprimer
              </Button>
            </div>
          ))}
          <Button color="green" onClick={() => append({ productId: "", quantity: 1 })}>
            Ajouter un produit
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 pt-10 pb-2 justify-end">
        <Button variant="gradient" color="blue" type="submit" className="rounded-lg">
          <span>{btnName}</span>
        </Button>
        <Button
          variant="text"
          color="red"
          onClick={() => handleOpen(null)}
          className="mr-1"
        >
          <span>Annuler</span>
        </Button>
      </div>
      <ToastMessage message={notification.message} type={notification.type} />
    </Form>
  );
};

export default FormAddOrder;