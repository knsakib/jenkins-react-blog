import React, { Component } from "react";

class Network extends Component {
  render() {
    return (
      <div>
        <h1>Network in Google Cloud</h1>
        <h2>Projects</h2>
        Projects are the outermost container and are used to group resources
        that share the same trust boundary. Many developers map Projects to
        teams since each Project has its own access policy (IAM) and member
        list. Projects also serve as a collector of billing and quota details
        reflecting resource consumption. Projects contain Networks which contain
        Subnetworks, Firewall rules, and Routes (see below architecture diagrams
        for illustration).
        <h2>Networks</h2>
        Networks directly connect your resources to each other and to the
        outside world. Networks, using Firewalls, also house the access policies
        for incoming and outgoing connections. Networks can be Global (offering
        horizontal scalability across multiple Regions) or Regional (offering
        low-latency within a single Region).
        <h2>Subnetworks</h2>
        Subnetworks allow you to group related resources (Compute Engine
        instances) into RFC1918 private address spaces. Subnetworks can only be
        Regional. A subnetwork can be in auto mode or custom mode. An auto mode
        network has one subnet per region, each with a predetermined IP range
        and gateway. These subnets are created automatically when you create the
        auto mode network, and each subnet has the same name as the overall
        network. A custom mode network has no subnets at creation. In order to
        create an instance in a custom mode network, you must first create a
        subnetwork in that region and specify its IP range. A custom mode
        network can have zero, one, or many subnets per region.
        <h2>The Default Network</h2>
        When any Project is created, a single Network named default is created
        for you. The default Network has the following 2 firewall rules defined
        for network traffic:
        <code>
          <br />default-deny-all-ingress
        </code>: Deny all incoming traffic
        <code>
          <br />default-allow-all-egress
        </code>: Allow all outbound traffic <br />
        The following firewall rules are created for specific protocols and the
        roles they play in the default Network.
        <code>
          <br />default-allow-internal
        </code>: Allows network connections of any protocol and port between
        instances on the network.
        <code>
          <br />default-allow-ssh
        </code>: Allows SSH connections from any source to any instance on the
        network over TCP port 22.
        <code>
          <br />default-allow-rdp
        </code>: Allows RDP connections from any source to any instance on the
        network over TCP port 3389.
        <code>
          <br />default-allow-icmp
        </code>: Allows ICM
        <h2>PRIORITY</h2>
        Each firewall rule has a Priority value from 0-65535 inclusive. Relative
        priority values are used to determine precedence of conflicting rules.
        Lower priority value implies higher precedence. When unspecified, a
        priority value of 1000 is used. If a packet matches conflicting rules
        with the same priority, the deny policy takes precedence. Important:{" "}
        <b>
          Since the default Network allows relatively open access, it is a
          recommended best practice that you delete it.
        </b>
        You cannot delete the default Network unless another Network is present.
        A Project requires at least one Network. Because this lab has the
        user-created Network mynetwork, we can delete the default Network.
        <h2>Stateful Firewalls</h2>
        GCP Firewalls are stateful: for each initiated connection tracked by
        allow rules in one direction, the return traffic is automatically
        allowed, regardless of any rules.
        <h2>Firewall Rules and IAM</h2>
        The privilege of creating, modifying, and deleting firewall rules is
        reserved for the compute.securityAdmin role by IAM. Users assigned to
        the compute.networkAdmin role are able to safely view and list firewall
        rules that might apply to their projects. See the Network-specific IAM
        roles section later in this lab for more on this topic. Remember: All
        instances are configured with a "hidden" firewall rule that drops TCP
        connections after 10 minutes of inactivity. TCP keep-alives can be used
        to alter this behavior. See documentation for details on how to do that.
        <h2>Allow Ingress Rules </h2>
        First mynetwork is created by
        <code>
          <br />gcloud compute networks create mynetwork --mode=auto<br />
        </code>
        Because by default all ingress are denied, so logical next step towards
        opening network one at a step is allowing ingress. Example of adding
        some ingress firewall rules to allow us to SSH and ping the instances
        using the gcloud command line in Cloud Shell:<br />
        Network=mynetwork, icmp firewall rule name=mynetwork-allow-icmp, ssh
        rule name=mynetwork-allow-ssh, internal allow rule
        name=mynetwork-allow-internal
        <code>
          {" "}
          <br />gcloud beta compute firewall-rules create mynetwork-allow-icmp
          --network mynetwork --action ALLOW --direction INGRESS --rules icmp
          <br />gcloud beta compute firewall-rules create mynetwork-allow-ssh
          --network mynetwork --action ALLOW --direction INGRESS --rules tcp:22
          <br />gcloud beta compute firewall-rules create
          mynetwork-allow-internal --network mynetwork --action ALLOW
          --direction INGRESS --rules all --source-ranges 10.128.0.0/9
          <br />gcloud beta compute firewall-rules list
          filter="network:mynetwork"{" "}
        </code>
        When you create a VM on this netwrok, you create by
        <code>
          <br />gcloud compute instances create mynet-us-vm --zone=us-central1-a
          --network=mynetwork
          <br />gcloud compute instances create mynet-eu-vm
          --zone=europe-west1-b --network=mynetwork<br />
        </code>
        Because it is custom network subnetwork is not automatically created per
        region. To create it,
        <code>
          <br />gcloud compute networks subnets create privatesubnet
          --network=privatenet \ --region=us-central1 --range=10.0.0.0/24
          --enable-private-ip-google-access<br />
        </code>
        TO create a VM in that network,
        <code>
          gcloud compute instances create privatenet-us-vm --zone=us-central1-f
          \ --subnet=privatesubnet
        </code>
        To create firewall rule in a custom subnet networks First create a
        privatenet with custom subnet:
        <code>gcloud compute networks create privatenet --mode=custom</code>
        <code>
          <br />gcloud beta compute firewall-rules create privatenet-allow-icmp
          \ --network privatenet --action ALLOW --direction INGRESS --rules icmp
          <br />gcloud beta compute firewall-rules create privatenet-allow-ssh \
          --network privatenet --action ALLOW --direction INGRESS --rules tcp:22
          <br />gcloud beta compute firewall-rules create
          privatenet-allow-internal \ --network privatenet --action ALLOW
          --direction INGRESS --rules all \ --source-ranges 10.0.0.0/24<br />
        </code>
        To create VMs in that network,
        <code>
          <br />
          gcloud compute instances create privatenet-us-vm --zone=us-central1-f
          \ --subnet=privatesubnet
        </code>
        <h2>Deny Egress Rules</h2>
        Now the firewall is created for basic ingress, we can establish specific
        deny rule. We were able to ping from mynet-eu-vm to mynet-us-vm, If we
        want to deny that, Egress firewall rules require a --destination-ranges
        flag.
        <code>
          <br />gcloud beta compute firewall-rules create mynetwork-deny-icmp \
          --network mynetwork --action DENY --direction EGRESS --rules icmp \
          --destination-ranges 10.132.0.2 --priority 500
          <br />gcloud beta compute firewall-rules list \
          --filter="network:mynetwork AND name=mynetwork-deny-icmp" <br />
        </code>
        Command Output:
        <code>
          <br />NAME NETWORK DIRECTION PRIORITY SRC_RANGES DEST_RANGES ALLOW
          DENY <br />
          project1-net-deny-icmp project1-net EGRESS 500 10.132.0.2 icmp <br />
        </code>
        Go back to the mynet-us-vm SSH shell and re-run the ping command. You
        should no longer see the nice icmp results printing, the command seems
        to hang. This is the deny firewall rule in action. Ctrl+c to exit.
        <b>
          Note 1: This rule was created with the direction EGRESS. Since ping is
          a bi-directional protocol, this will block ICMP as traffic leaves the
          VMs virtual NIC. If this rule were to be created with the INGRESS
          direction, the ICMP packets would be allowed to leave the VM's virtual
          NIC.
        </b>
        <br />
        <b>
          Note 2: If you supply both --source-ranges and --source-tags, you can
          allow traffic from both external IP ranges and internal instances
          identified by tags. The firewall matches either-or the source-range or
          source-tag.
        </b>
        <h2>Cloud Routes</h2>
        If you want traffic from specific instances to specific ranges to be
        routed in a specific way, you can use Google Cloud Routes to set up the
        destination for this traffic. You can route traffic based on instance
        tags and destination range, and you can set the next hop to either:
        <li>A specific instance (by instancename or IP)</li>
        <li>A VPN Tunnel</li>
        <li>The default internet gateway</li>
        If multiple routes exist, the more specific route will be used. If there
        are multiple of those, the lowest priority value is used. Between
        Subnetworks, routes are automatically created implicitly at lowest
        priority value. Those routes cannot be changed or deleted.
        <h3>Convert to a NAT gateway</h3>
        Let's convert an instance to a NAT gateway so privatenet-us-vm can talk
        to the Internet without having an IP assigned. first create the VM:
        <code>
          <br />gcloud compute instances create privatenet-ksakib
          --zone=us-central1-c \ --subnet=privatesubnet --can-ip-forward <br />
        </code>
        Within privatenet, there are 2 instances: privatenet-nat and
        privatenet-us-vm. Both have a public IP, but you will remove the public
        IP from privatenet-us-vm. After the public IP is removed, you can SSH
        into privatenet-us-vm through privatenet-nat. You might want to use a
        NAT gateway either for additional filtering or if you want to egress
        from specific static IP addresses. In this case we just set it up
        without specific functionality.
        <h3>CREATE NAT GATEWAY</h3>
        The first step was already taken when the instance was created: the IP
        forwarding was set to On, which we did via the
        <code>--can-ip-forward</code> flag. This flag cannot be changed after
        the VM has been created. Now you will tag privatenet-us-vm and create a
        route through the gateway. In Cloud Shell run the following:
        <code>
          <br />gcloud compute instances add-tags privatenet-us-vm --zone
          us-central1-f --tags nat-me
          <br />gcloud compute routes create nat-route --network privatenet
          --destination-range 0.0.0.0/0 --next-hop-instance privatenet-nat
          --next-hop-instance-zone us-central1-c --tags nat-me --priority 800
          <br />
        </code>
        SSH privatenet-bastion and activate IP forwarding and NAT on the Linux
        side:
        <code>
          <br />sudo sysctl -w net.ipv4.ip_forward=1
          <br />sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
          <br />ssh privatenet-us-vm <br />
        </code>
        <br />Test if eberything is working properly by running follcowing test
        commands
        <code>
          {" "}
          <br /> gsutil ls gs://gcp-next2017-security-bootcamp/README<br />
        </code>
        (Output:)
        <code>
          <br /> gs://gcp-next2017-security-bootcamp/README <br />
          <br /> gsutil cat gs://gcp-next2017-security-bootcamp/README<br />
        </code>
        (Output:)
        <code>
          <br /> Last updated: Wed 2017-02-22
          <br /> Files used in the Google Cloud Platform Next 2017 Security
          Bootcamp codelabs. <br />
          <br /> curl ifconfig.co<br />
        </code>
        (Output:)
        <code>
          <br /> xxx.xxx.xxx.xxx (IP of privatenet-bastion)<br />
        </code>
        NAT is working: privetnet-us-vm appears to the outside from
        privatenet-bastion IP address.
      </div>
    );
  }
}

export default Network;
