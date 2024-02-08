"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../@/components/ui/popover"

const seasons = [
    {
        value: "2023",
        label: '2023-2024',
    },
    {
        value: "2022",
        label: '2022-2023',
    },
    {
        value: "2021",
        label: '2021-2022',
    },
    {
        value: "2020",
        label: '2020-2021',
    },
    {
        value: "2019",
        label: '2019-2020',
    },
    {
        value: "2018",
        label: '2018-2019',
    },
    {
        value: "2017",
        label: '2017-2018',
    },
    {
        value: "2016",
        label: '2016-2017',
    },
    {
        value: "2015",
        label: '2015-2016',
    },
]

const ComboboxSeasons = ({ handleSeasonChange }) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between text-[#4487f6] font-semibold"
                >
                    <div className="text-[#9aa0a6]">
                        Saison
                    </div>
                    {value
                        ? seasons.find((season) => season.value === value)?.label
                        : "2023-2024"}
                    <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] border-none bg-zinc-900 text-white">
                <Command>
                    <CommandInput placeholder="Rechercher une saison..." />
                    <CommandEmpty>Aucune saison trouvé</CommandEmpty>
                    <CommandGroup>
                        {seasons.map((season) => (
                            <CommandItem
                                key={season.value}
                                value={season.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                    handleSeasonChange(currentValue)
                                }}
                                className="flex justify-start items-center mt-2 cursor-pointer w-full"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === season.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {season.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ComboboxSeasons

/* return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <div className="bg-slate-600">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] border-none text-emerald-400 font-semibold justify-start"
                >
                    {value
                        ? seasons.find((season) => season.value === value)?.label
                        : "2023-2024"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 border-none bg-zinc-900 text-white cursor-pointer">
            <Command>
                <CommandInput placeholder="Rechercher une saison..." />
                <CommandEmpty>Aucune saison trouvé</CommandEmpty>
                <CommandGroup className="flex">
                    {seasons.map((season) => (
                        <CommandItem
                            key={season.value}
                            value={season.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === season.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {season.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
) */
