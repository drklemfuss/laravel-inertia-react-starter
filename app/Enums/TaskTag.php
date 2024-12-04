<?php

namespace App\Enums;

enum TaskTag: string
{
    case DEVELOPMENT = 'development';
    case DESIGN = 'design';
    case RESEARCH = 'research';
    case REVIEW = 'review';
    case DEPLOYMENT = 'deployment';
}
