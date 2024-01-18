"use client";

import type {ChangeEvent, FormEvent} from "react";
import type {Player} from "../interface/interface";

import {toast} from "sonner";
import {useState} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {useTeamStore} from "../store/teams/teams-store";

export default function Form() {
  const addPlayer = useTeamStore((state) => state.addPlayer);
  const [formData, setFormData] = useState<{name: string; level: number}>({
    name: "",
    level: 0,
  });
  const [errors, setErrors] = useState<{name?: string; level?: string}>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setFormData((prevData) => ({...prevData, [name]: value}));
    setErrors((prevErrors) => ({...prevErrors, [name]: undefined}));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationErrors: {name?: string; level?: string} = {};

    if (formData.name.length < 3) {
      validationErrors.name = "El nombre debe tener al menos 3 letras.";
    }

    if (!formData.level) {
      validationErrors.level = "Por favor, selecciona un nivel.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: formData.name,
      level: formData.level,
    };

    addPlayer(newPlayer);
    toast.success(`${newPlayer.name} agregado, tuki.`);

    setFormData({name: "", level: 0});
  };

  return (
    <form
      className="fade mx-auto grid min-h-96 w-full grid-cols-1  gap-8 rounded-sm border-2 border-white p-8 md:max-w-[60%]"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="name">Nombre del jugador:</Label>
      <Input
        id="name"
        name="name"
        placeholder="Ingrese nombre del jugador"
        value={formData.name}
        onChange={handleChange}
      />
      <p className="text-red-500">{errors.name ? errors.name : ""}</p>
      <Select
        defaultValue="1"
        name="level"
        onValueChange={(value) => setFormData((prevData) => ({...prevData, level: Number(value)}))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Estrellas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">★</SelectItem>
          <SelectItem value="2">★★</SelectItem>
          <SelectItem value="3">★★★</SelectItem>
          <SelectItem value="4">★★★★</SelectItem>
          <SelectItem value="5">★★★★★</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-red-500">{errors.level ? errors.level : ""}</p>

      <Button type="submit">Agregar jugador</Button>
    </form>
  );
}
