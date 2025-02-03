#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <ifaddrs.h>

// Fonction qui affiche toutes les interfaces et leurs adresses IP
void show_interfaces(const char *ifname)
{
    struct ifaddrs *ifaddr, *ifa;
    char IP_BUFFER[INET6_ADDRSTRLEN];
    int found = 0;

    // Récupère la liste des interfaces réseau
    if (getifaddrs(&ifaddr) == -1)
    {
        fprintf(stderr, "Erreur : impossible de récupérer les interfaces réseau.\n");
        exit(EXIT_FAILURE);
    }

    // Parcours toutes les interfaces
    for (ifa = ifaddr; ifa != NULL; ifa = ifa->ifa_next)
    {
        if (!ifa->ifa_addr)
            continue;

        // Si un argument est passé en paramètre, compare le noms
        if (strlen(ifname) > 1 && strcmp(ifa->ifa_name, ifname) != 0)
        {
            continue;
        }
        else
        {
            found = 1;
        }

        printf("%s: ", ifa->ifa_name);

        // Vérifie si l'adresse est IPv4
        if (ifa->ifa_addr->sa_family == AF_INET)
        {
            // Cast en sockaddr_in*
            struct sockaddr_in *sa = (struct sockaddr_in *)ifa->ifa_addr;
            // Convertit l'adresse en un format lisible
            inet_ntop(AF_INET, &sa->sin_addr, IP_BUFFER, INET_ADDRSTRLEN);
            printf("IPv4: %s\n", IP_BUFFER);
        }
        // Vérifie si l'adresse est IPv6
        else if (ifa->ifa_addr->sa_family == AF_INET6)
        {
            // Cast en sockaddr_in6*
            struct sockaddr_in6 *sa = (struct sockaddr_in6 *)ifa->ifa_addr;
            // Convertit l'adresse en un format lisible
            inet_ntop(AF_INET6, &sa->sin6_addr, IP_BUFFER, INET6_ADDRSTRLEN);
            printf("IPv6: %s\n", IP_BUFFER);
        }
        // Si l'interface n'a pas d'adresse IP attribuée
        else
        {
            printf("(No IP address)\n");
        }
    }

    // Si aucune adresse n'est trouvée pour cette interface
    if (strlen(ifname) > 1 && !found)
    {
        printf("No addresses found for interface: %s\n", ifname);
    }

    freeifaddrs(ifaddr);
}

// Programme principal
int main(int argc, char *argv[])
{
    // Si l'utilisateur passe l'option -a, on affiche toutes les interfaces
    if (argc == 2 && strcmp(argv[1], "-a") == 0)
    {
        show_interfaces("");
    }
    // Si l'utilisateur passe l'option -i suivi du nom d'une interface, on affiche ses adresses
    else if (argc == 3 && strcmp(argv[1], "-i") == 0)
    {
        show_interfaces(argv[2]);
    }
    // Sinon, on affiche un message d'erreur sur l'utilisation
    else
    {
        fprintf(stderr, "Usage: %s -a | -i ifname\n", argv[0]);
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
