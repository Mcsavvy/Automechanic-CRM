import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    ChevronDown,
    ListFilter,
    Search,
    Ellipsis,
    Pencil,
    Trash,
    X
} from "lucide-react";
import {GoodFilter, goodCategories} from "@/lib/stores/good-store";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { useGoodStore } from "@/lib/providers/good-store-provider";

export default function GoodsFilters() {
    // @ts-ignore
    const [selectedCategory, setSelectedCategory] = useQueryState<string>("category", {defaultValue: ""});
    // @ts-ignore
    const [selectedStatus, setSelectedStatus] = useQueryState<string>("status", {defaultValue: ""});
    const {applyFilter, filter} = useGoodStore((state) => state);
    
    function handleApplyFilters() {
        const newFilter: GoodFilter = {};
        if (selectedCategory.length) {
            newFilter.category = selectedCategory.trim();
        }
        if (selectedStatus.length) {
            newFilter.status = selectedStatus.trim() as "in-stock" | "low-stock" | "out-of-stock";
        }
        applyFilter({ ...filter, ...newFilter });
    }
    return (
        <Popover>
            <PopoverTrigger className="flex flex-row items-center justify-start gap-3 border border-neu-3 p-[8px] rounded-md">
                <ListFilter size={20} strokeWidth={1.5} /> Filter
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-3 overflow-auto h-fit">
                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <div className="flex flex-row items-center justify-between">
                            <SelectTrigger className="w-[180px] text-left">
                                <SelectValue placeholder="Good Category" />
                            </SelectTrigger>
                            <Button
                                variant={"ghost"}
                                onClick={() => setSelectedCategory("")}
                                disabled={!selectedCategory.length}
                                size={"sm"}
                            >
                                <X size={20} strokeWidth={1.5} />
                            </Button>
                        </div>
                        <SelectContent>
                            <SelectGroup>
                                {goodCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        value={selectedStatus}
                        // @ts-ignore
                        onValueChange={setSelectedStatus}
                    >
                        <div className="flex flex-row items-center justify-between">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Good Status" />
                            </SelectTrigger>
                            <Button
                                variant={"ghost"}
                                onClick={() => setSelectedStatus("")}
                                disabled={!selectedStatus.length}
                                size={"sm"}
                            >
                                <X size={20} strokeWidth={1.5} />
                            </Button>
                        </div>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={"in-stock"}>
                                    In Stock
                                </SelectItem>
                                <SelectItem value={"low-stock"}>
                                    Low Stock
                                </SelectItem>
                                <SelectItem value={"out-of-stock"}>
                                    Out of Stock
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant={"default"} onClick={handleApplyFilters}>
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
