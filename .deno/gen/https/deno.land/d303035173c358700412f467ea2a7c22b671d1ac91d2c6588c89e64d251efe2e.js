export function fdatasync(fd, callback) {
    Deno.fdatasync(fd).then(()=>callback(null), callback);
}
export function fdatasyncSync(fd) {
    Deno.fdatasyncSync(fd);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0Ny4wL25vZGUvX2ZzL19mc19mZGF0YXN5bmMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbmltcG9ydCB7IENhbGxiYWNrV2l0aEVycm9yIH0gZnJvbSBcIi4vX2ZzX2NvbW1vbi50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZmRhdGFzeW5jKFxuICBmZDogbnVtYmVyLFxuICBjYWxsYmFjazogQ2FsbGJhY2tXaXRoRXJyb3IsXG4pIHtcbiAgRGVuby5mZGF0YXN5bmMoZmQpLnRoZW4oKCkgPT4gY2FsbGJhY2sobnVsbCksIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZkYXRhc3luY1N5bmMoZmQ6IG51bWJlcikge1xuICBEZW5vLmZkYXRhc3luY1N5bmMoZmQpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sU0FBUyxTQUFTLENBQ3ZCLEVBQVUsRUFDVixRQUEyQixFQUMzQjtJQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3pEO0FBRUQsT0FBTyxTQUFTLGFBQWEsQ0FBQyxFQUFVLEVBQUU7SUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN4QiJ9