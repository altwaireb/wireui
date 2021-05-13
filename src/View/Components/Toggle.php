<?php

namespace WireUi\View\Components;

class Toggle extends FormComponent
{
    public $except = ['type'];

    public bool $sm;

    public bool $md;

    public bool $lg;

    public ?string $label;

    public ?string $leftLabel;

    public function __construct(
        bool $md = false,
        bool $lg = false,
        ?string $label = null,
        ?string $leftLabel = null
    ) {
        $this->sm        = !$md && !$lg;
        $this->md        = $md;
        $this->lg        = $lg;
        $this->label     = $label;
        $this->leftLabel = $leftLabel;
    }

    protected function getView(): string
    {
        return 'wireui::components.toggle';
    }

    public function backgroundClasses(): string
    {
        return $this->classes([
            'w-7 h-4'  => $this->sm,
            'w-9 h-5'  => $this->md,
            'w-10 h-6' => $this->lg,
        ]);
    }

    public function circleClasses(): string
    {
        return $this->classes([
            'left-0.5 w-3 h-3'   => $this->sm,
            'left-1 w-3.5 h-3.5' => $this->md,
            'left-1 w-4 h-4'     => $this->lg,
        ]);
    }
}
