<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class StorePrintOrderRequest extends FormRequest { public function authorize(): bool{return true;} public function rules(): array{return ['email'=>['required','email','max:255'],'pickup_at'=>['required','date','after:now'],'pdf'=>['required','file','mimes:pdf','mimetypes:application/pdf','max:'.config('queueless.upload_max_kilobytes')],'terms'=>['accepted']];} }
