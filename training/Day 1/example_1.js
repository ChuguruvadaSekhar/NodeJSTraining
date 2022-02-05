global.x = 5;
setTimeout(() => {
  debugger; //Opens to REPL(read–eval–print loop (REPL), also termed an interactive toplevel or language shell) console...hit "cont" to continue
  console.log('world');
}, 1000);
console.log('hello');