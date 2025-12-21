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
        className={cn("p-2 sm:p-3 w-full", className)}
        classNames={{
          months: "flex flex-col space-y-2",
          month: "space-y-2 w-full",
          caption: "flex justify-center items-center pt-1 pb-3 relative px-12",
          caption_label: "text-sm sm:text-base font-semibold text-foreground text-center flex-1",
          nav: "flex items-center justify-between gap-1",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-8 sm:h-9 sm:w-9 bg-white border-2 border-primary/20 p-0 opacity-90 hover:opacity-100 active:opacity-100 hover:bg-primary/5 rounded-full shadow-md z-20"
          ),
          nav_button_previous: "absolute left-2 top-1/2 -translate-y-1/2",
          nav_button_next: "absolute right-2 top-1/2 -translate-y-1/2",
          table: "w-full border-collapse mt-1",
          head_row: "flex justify-between mb-1",
          head_cell:
            "text-muted-foreground rounded-md w-8 sm:w-9 font-medium text-[10px] sm:text-xs flex-1 text-center py-1",
          row: "flex w-full justify-between mb-0.5",
          cell: "h-8 sm:h-9 flex-1 text-center text-xs p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 sm:h-9 sm:w-9 p-0 font-medium text-xs sm:text-sm aria-selected:opacity-100 rounded-full active:scale-95 transition-transform"
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
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />,
        }}
        {...props}
      />
    </div>
  );
}
MobileDatePicker.displayName = "MobileDatePicker";

export { MobileDatePicker };

