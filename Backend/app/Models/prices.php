<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class prices extends Model
{
    use HasFactory;

    protected $table = 'prices';

    protected $primaryKey='id';

    protected $fillable=['model_id','date_added','price'];
}
