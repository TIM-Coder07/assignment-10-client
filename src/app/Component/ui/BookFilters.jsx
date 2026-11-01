
"use client";

import {
  Button,
  Label,
  SearchField,
  Select,
  ListBox,
} from "@heroui/react";

import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

const categories = [
  "Novel",
  "Science",
  "History",
  "Programming",
  "Biography",
];

const availabilityOptions = [
  "All",
  "Available",
  "Unavailable",
];

const deliveryFeeOptions = [
  "All",
  "Free",
  "0-50",
  "51-100",
  "100+",
];

export default function BookFilters({
  search = "",
  category = "",
  availability = "",
  deliveryFee = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Update URL without removing other active filters
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "All"
    ) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    const queryString = params.toString();

    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    );
  };

  // Clear all filters
  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const fieldClassName = "w-full lg:flex-1";

  const triggerClassName = `
    min-h-11
    rounded-xl
    border border-slate-200
    bg-white
    shadow-none
    transition-all duration-200
    hover:border-violet-300
    focus-within:border-violet-500
  `;

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        {/* Search */}
        <SearchField
          key={search}
          defaultValue={search}
          onSubmit={(value) => updateFilter("search", value.trim())}
          onClear={() => updateFilter("search", "")}
          className={fieldClassName}
        >
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Search Books
          </Label>

          <SearchField.Group
            className={`
              ${triggerClassName}
              flex items-center gap-2
              px-3
              focus-within:ring-2
              focus-within:ring-violet-100
            `}
          >
            <SearchField.SearchIcon className="text-slate-400" />

            <SearchField.Input
              className="text-sm text-slate-800 placeholder:text-slate-400"
              placeholder="Search by title..."
            />

            <SearchField.ClearButton className="text-slate-400 hover:text-violet-600" />
          </SearchField.Group>
        </SearchField>

        {/* Category */}
        <Select
          selectedKey={category || null}
          onSelectionChange={(key) =>
            updateFilter("category", key)
          }
          className={fieldClassName}
        >
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </Label>

          <Select.Trigger className={triggerClassName}>
            <Select.Value
              className="text-sm text-slate-700"
              placeholder="All Categories"
            />
            <Select.Indicator className="text-slate-400" />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {categories.map((item) => (
                <ListBox.Item
                  key={item}
                  id={item}
                  textValue={item}
                >
                  <Label>{item}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Availability */}
        <Select
          selectedKey={availability || null}
          onSelectionChange={(key) =>
            updateFilter("availability", key)
          }
          className={fieldClassName}
        >
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Availability
          </Label>

          <Select.Trigger className={triggerClassName}>
            <Select.Value
              className="text-sm text-slate-700"
              placeholder="All Availability"
            />
            <Select.Indicator className="text-slate-400" />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {availabilityOptions.map((item) => (
                <ListBox.Item
                  key={item}
                  id={item}
                  textValue={item}
                >
                  <Label>{item}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Delivery Fee */}
        <Select
          selectedKey={deliveryFee || null}
          onSelectionChange={(key) =>
            updateFilter("deliveryFee", key)
          }
          className={fieldClassName}
        >
          <Label className="mb-2 block text-sm font-semibold text-slate-700">
            Delivery Fee
          </Label>

          <Select.Trigger className={triggerClassName}>
            <Select.Value
              className="text-sm text-slate-700"
              placeholder="All Delivery Fees"
            />
            <Select.Indicator className="text-slate-400" />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {deliveryFeeOptions.map((item) => (
                <ListBox.Item
                  key={item}
                  id={item}
                  textValue={item}
                >
                  <Label>{item}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

      </div>

      {/* Bottom Action */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-xs leading-5 text-slate-500">
          Refine your search to find the right book for you.
        </p>

        <Button
          onPress={clearFilters}
          className="
            min-h-10
            rounded-xl
            border border-slate-200
            bg-white
            px-5
            text-sm font-semibold
            text-slate-600
            shadow-none
            transition-all duration-200
            hover:border-violet-200
            hover:bg-violet-50
            hover:text-violet-700
          "
        >
          Clear Filters
        </Button>

      </div>
    </div>
  );
}
