#include <stdio.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <unistd.h>
#include <netinet/in.h>
#include <fcntl.h>
#include <pwd.h>
#include <errno.h>
#include <dirent.h>
#include <grp.h>

#include <sys/wait.h>
#include <sys/user.h>
#include <sys/time.h>
#include <sys/reg.h>
#include <sys/socket.h>
#include <sys/ptrace.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/user.h>
#include <sys/reg.h>
#include <sys/resource.h>
#include <sys/stat.h>
#include <sys/mount.h>

//http://pubs.opengroup.org/onlinepubs/009695399/functions/readlink.html
int main(){

  char buf[1024];
  ssize_t len;

  if ((len = readlink("/modules/pass1", buf, sizeof(buf)-1)) != -1)
    buf[len] = '\0';

  return 0;
}