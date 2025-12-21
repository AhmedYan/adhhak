import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type MobileDatePickerProps = React.ComponentProps<typeof DayPicker>;

/**
 * Mobile-optimized calendar component with large touch targets
 * Designed specifically for mobile devices with better UX
 */
function MobileDatePicker({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: MobileDatePickerProps) {
  return (
    <div className="w-full">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3 w-full", className)}
        classNames={{
          months: "flex flex-col space-y-3",
          month: "space-y-3 w-full",
          caption: "flex justify-between items-center pt-2 pb-4 relative",
          caption_label: "text-lg font-bold text-foreground",
          nav: "flex items-center justify-between gap-1",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-10 w-10 bg-transparent p-0 opacity-70 hover:opacity-100 active:opacity-100 rounded-full border-2"
          ),
          nav_button_previous: "absolute left-0",
          nav_button_next: "absolute right-0",
          table: "w-full border-collapse mt-2",
          head_row: "flex justify-between mb-2",
          head_cell:
            "text-muted-foreground rounded-md w-11 font-semibold text-xs sm:text-sm flex-1 text-center py-2",
          row: "flex w-full justify-between mb-1",
          cell: "h-12 flex-1 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-12 w-12 p-0 font-semibold text-base aria-selected:opacity-100 rounded-full active:scale-95 transition-transform"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full shadow-md",
          day_today: "bg-accent text-accent-foreground font-bold rounded-full border-2 border-primary",
          day_outside:
            "day-outside text-muted-foreground opacity-30",
          day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5" />,
        }}
        {...props}
      />
    </div>
  );
}
MobileDatePicker.displayName = "MobileDatePicker";

export { MobileDatePicker };

