<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Get all todos
    public function index(Request $request)
    {
        $todos = $request->user()->todos()->latest()->get();

        return response()->json($todos);
    }

    // Create a new todo
    public function store(StoreTodoRequest $request)
    {
        $validated = $request->validated();

        $todo = $request->user()->todos()->create($validated);

        return response()->json($todo, 201);
    }

    // Update todo
    public function update(UpdateTodoRequest $request, $id)
    {
        $todo = $request->user()->todos()->findOrFail($id);

        $todo->update($request->validated());

        return response()->json($todo);
    }

    // Delete todo
    public function destroy(Request $request, $id)
    {
        $todo = $request->user()->todos()->findOrFail($id);

        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully.'], 200);
    }
}
