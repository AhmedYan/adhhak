import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type MobileCalendarProps = React.ComponentProps<typeof DayPicker>;

function MobileCalendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: MobileCalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2 w-full", className)}
      classNames={{
        months: "flex flex-col space-y-2",
        month: "space-y-2",
        caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "text-base font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-70 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row: "flex justify-between mb-1",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-medium text-xs sm:text-sm flex-1 text-center",
        row: "flex w-full justify-between mb-1",
        cell: "h-10 flex-1 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-medium text-sm aria-selected:opacity-100 rounded-full"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        day_today: "bg-accent text-accent-foreground font-semibold rounded-full",
        day_outside:
          "day-outside text-muted-foreground opacity-30",
        day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
MobileCalendar.displayName = "MobileCalendar";

export { MobileCalendar };

