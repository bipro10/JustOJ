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
#include <signal.h>

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
#include <sys/sysctl.h>
#include <sys/reboot.h>

//http://www.geeksforgeeks.org/socket-programming-cc/
int main()
{

   int server_fd;
  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
  {
    perror("socket failed");
    exit(1);
  }
   return 0;
}
