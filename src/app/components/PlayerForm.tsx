"use client";
import type {Player} from "../interface/interface";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {useTeamStore} from "../store/teams/teams-store";
const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 letras.",
  }),
  level: z.number({
    required_error: "Por favor selecciona un nivel.",
  }),
});

export default function PlayerForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      level: 1,
    },
  });

  const addPlayer = useTeamStore((state) => state.addPlayer);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: values.name,
      level: values.level,
    };

    addPlayer(newPlayer);
    toast.success(`${newPlayer.name} agregado, tuki.`);
  };

  return (
    <Form {...form}>
      <form
        className="fade bg-blackly/75 mx-auto grid min-h-96 w-full grid-cols-1 gap-8  rounded-sm border-2 border-white p-8 backdrop-blur-xl md:w-4/6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nombre jugador:</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese nombre del jugador" {...field} />
              </FormControl>
              <FormDescription>Este es el nombre del jugador</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nivel se jugador</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nivel del jugador" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">★</SelectItem>
                  <SelectItem value="2">★★</SelectItem>
                  <SelectItem value="3">★★★</SelectItem>
                  <SelectItem value="4">★★★★</SelectItem>
                  <SelectItem value="5">★★★★★</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Selecciona el nivel del jugador.</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button className="hover:bg-rose-800 hover:text-white" type="submit">
          Agregar jugador
        </Button>
      </form>
    </Form>
  );
}
