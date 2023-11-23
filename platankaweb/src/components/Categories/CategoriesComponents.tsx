"use client";
import React, { useEffect, useState } from "react";
import Get from "../../utilities/Get";
import { Category } from "../../types/post";
import {
  Checkbox,
  CheckboxGroup,
  Switch,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

const CategoriesComponents = ({
  selected,
  setSelected,
  selectedRadio,
  setSelectedRadio,
  loading,
}: {
  loading: boolean;
  selected: string[];
  setSelected: any;
  selectedRadio: string;
  setSelectedRadio: any;
}) => {
  const [categories, setCategories] = useState<Category[] | null>();
  const categoriesHandle = async () => {
    const categories = await Get<Category[]>({ urlEnd: "Categories" });
    setCategories(categories);
  };

  useEffect(() => {
    categoriesHandle();
  }, []);

  if (!categories) return;
  return (
    <div className="flex gap-12 ">
      <CheckboxGroup
        isDisabled={loading}
        label="Wybierz kategorie"
        color="primary"
        value={selected}
        orientation="horizontal"
        onValueChange={setSelected}
      >
        {categories.map((c) => {
          return (
            <Checkbox key={c._Id} value={c.name}>
              <span className=" capitalize">{c.name}</span>
            </Checkbox>
          );
        })}
      </CheckboxGroup>

      <RadioGroup
        isDisabled={loading}
        label="Pokaz produkty"
        orientation="horizontal"
        value={selectedRadio}
        onValueChange={setSelectedRadio}
      >
        <Radio value="">Wszystkie</Radio>
        <Radio value="true">Dostępne</Radio>
        <Radio value="false">Niedostępne</Radio>
      </RadioGroup>
    </div>
  );
};

export default CategoriesComponents;
