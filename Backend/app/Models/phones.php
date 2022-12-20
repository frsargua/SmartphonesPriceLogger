<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class phones extends Model
{
    use HasFactory;

    protected $table = 'phones';

    protected $primaryKey='id';

    protected $fillable=['brand_name','model','release_date','release_price'];

    public function prices()
    {
        return $this -> hasMany(prices::class);
    }
}
