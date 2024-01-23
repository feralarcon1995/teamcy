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

import {useTeamStore} from "../store/teams/teams-store";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 letras.",
  }),
  level: z
    .number()
    .min(1, {message: "El nivel no puede ser menor a 1."})
    .max(10, {message: "El nivel no puede ser mayor a 10."}),
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
        className="fade z-20 mx-auto grid max-h-full min-h-36 w-full grid-cols-1 place-content-center items-center gap-8 rounded-sm  border-2 border-white bg-blackly/75 p-8 backdrop-blur-xl md:w-4/6 md:grid-cols-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese nombre del jugador" {...field} />
              </FormControl>
              <FormDescription className="sr-only">Este es el nombre del jugador</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nivel:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ingrese nivel del jugador"
                  type="number"
                  onChange={(event) => {
                    const value = event.target.value;

                    field.onChange(value === "" ? "" : Number(value));
                  }}
                />
              </FormControl>
              <FormDescription className="sr-only">Coloque el nivel del jugador.</FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button className="self-end hover:bg-rose-800 hover:text-white" type="submit">
          Agregar
        </Button>
      </form>
    </Form>
  );
}
