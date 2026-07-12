"use client";

import {
  Button,
  Description,
  Label,
  SearchField,
  Select,
  ListBox,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Novel", "Science", "History", "Programming", "Biography"];

const availabilityOptions = ["All", "Available", "Unavailable"];

const deliveryFeeOptions = ["All", "Free", "0-50", "51-100", "100+"];

export default function BookFilters({
  search = "",
  category = "",
  availability = "",
  deliveryFee = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/browseBook?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/browseBook");
  };

  return (
    <div className="rounded-2xl border border-[#e0b7fe] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search */}
        <SearchField
          defaultValue={search}
          onSubmit={(value) => updateFilter("search", value)}
          className="flex-1"
        >
          <Label className="font-medium text-gray-700">Search Books</Label>

          <SearchField.Group
            className="
              border
              border-[#e0b7fe]
              bg-[#fdf8ff]
              transition-all
              duration-200
              focus-within:border-[#c76df3]
              focus-within:ring-2
              focus-within:ring-[#e0b7fe]/40
            "
          >
            <SearchField.SearchIcon className="text-[#9c4dcc]" />

            <SearchField.Input
              className="placeholder:text-gray-400"
              placeholder="Search by title..."
            />

            <SearchField.ClearButton className="text-[#9c4dcc]" />
          </SearchField.Group>
        </SearchField>

        {/* Category */}
        <Select
          selectedKey={category}
          onSelectionChange={(key) => updateFilter("category", key)}
          className="w-full lg:w-56"
        >
          <Label className="font-medium text-gray-700">Category</Label>

          <Select.Trigger
            className="
              border
              border-[#e0b7fe]
              bg-[#fdf8ff]
              transition-all
              duration-200
              hover:border-[#d39df8]
              data-[focus=true]:border-[#c76df3]
              data-[focus=true]:ring-2
              data-[focus=true]:ring-[#e0b7fe]/40
            "
          >
            <Select.Value placeholder="Category" />
            <Select.Indicator className="text-[#9c4dcc]" />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {categories.map((item) => (
                <ListBox.Item key={item}>
                  <Label>{item}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Availability */}
        <Select
          selectedKey={availability}
          onSelectionChange={(key) => {
            console.log(key);
          }}
          className="w-full lg:w-56"
        >
          <Label className="font-medium text-gray-700">Availability</Label>

          <Select.Trigger
            className="
              border
              border-[#e0b7fe]
              bg-[#fdf8ff]
              transition-all
              duration-200
              hover:border-[#d39df8]
              data-[focus=true]:border-[#c76df3]
              data-[focus=true]:ring-2
              data-[focus=true]:ring-[#e0b7fe]/40
            "
          >
            <Select.Value placeholder="Availability" />
            <Select.Indicator className="text-[#9c4dcc]" />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {availabilityOptions.map((item) => (
                <ListBox.Item key={item}>
                  <Label>{item}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Delivery Fee */}
        <Select
          selectedKey={deliveryFee}
          onSelectionChange={(key) => updateFilter("deliveryFee", key)}
          className="w-full lg:w-56"
        >
          <Label className="font-medium text-gray-700">Delivery Fee</Label>

          <Select.Trigger
            className="
              border
              border-[#e0b7fe]
              bg-[#fdf8ff]
              transition-all
              duration-200
              hover:border-[#d39df8]
              data-[focus=true]:border-[#c76df3]
              data-[focus=true]:ring-2
              data-[focus=true]:ring-[#e0b7fe]/40
            "
          >
            <Select.Value placeholder="Delivery Fee" />
            <Select.Indicator className="text-[#9c4dcc]" />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {deliveryFeeOptions.map((item) => (
                <ListBox.Item key={item}>
                  <Label>{item}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Clear Filters */}
        <Button
          onPress={clearFilters}
          className="
            w-full
            lg:w-auto
            bg-[#e0b7fe]
            text-[#5d2c86]
            font-semibold
            hover:bg-[#d6a4fb]
            transition-all
            duration-300
          "
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
