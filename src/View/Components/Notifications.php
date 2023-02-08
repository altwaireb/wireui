<?php

namespace WireUi\View\Components;

class Notifications extends Component
{
    public const TOP_LEFT = 'top-left';
    public const TOP_CENTER = 'top-center';
    public const TOP_RIGHT = 'top-right';
    public const BOTTOM_LEFT = 'bottom-left';
    public const BOTTOM_CENTER = 'bottom-center';
    public const BOTTOM_RIGHT = 'bottom-right';

    private array $listsRtl = [
        'ar', 'ug', 'ur', 'uz-Arab', 'tg-Arab', 'sd',
        'fa', 'pa-Arab', 'ps', 'ks', 'ku', 'yi', 'he',
        'mn-Mong', 'shi-Tfng', 'shi-Tfng', 'dv'
    ];

    public function __construct(
        public string  $zIndex = 'z-50',
        public ?string $position = self::TOP_RIGHT,
    )
    {
        $this->position = $this->getPosition($position);
    }

    public function render()
    {
        return view('wireui::components.notifications');
    }

    public function getPosition(?string $position): string
    {
        if (in_array($this->getLang(), $this->listsRtl)) {

            return $this->classes([
                'sm:items-start sm:justify-end' => $position === self::TOP_LEFT,
                'sm:items-start sm:justify-center' => $position === self::TOP_CENTER,
                'sm:items-start sm:justify-start' => $position === self::TOP_RIGHT,
                'sm:items-end sm:justify-end' => $position === self::BOTTOM_LEFT,
                'sm:items-end sm:justify-center' => $position === self::BOTTOM_CENTER,
                'sm:items-end sm:justify-start' => $position === self::BOTTOM_RIGHT,
            ]);

        } else {
            return $this->classes([
                'sm:items-start sm:justify-start' => $position === self::TOP_LEFT,
                'sm:items-start sm:justify-center' => $position === self::TOP_CENTER,
                'sm:items-start sm:justify-end' => $position === self::TOP_RIGHT,
                'sm:items-end sm:justify-start' => $position === self::BOTTOM_LEFT,
                'sm:items-end sm:justify-center' => $position === self::BOTTOM_CENTER,
                'sm:items-end sm:justify-end' => $position === self::BOTTOM_RIGHT,
            ]);
        }
    }

    private function getLang(): string
    {
        return str_replace('_', '-', app()->getLocale()) ?? 'en';
    }
}
