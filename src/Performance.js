import React, { Component } from "react";

class Performance extends Component {
  render(){
    return(
      <div>
          <h1>Simple Traceroute and Performance Testing</h1>

  Traceroute is a tool to trace the path between two hosts. A traceroute can be a helpful first step to uncovering many different types of network problems. Support or network engineers often ask for a traceroute when diagnosing network issues.

  <h2>Functionality:</h2> Traceroute shows all Layer 3 (routing layer) hops between the hosts. This is achieved by sending packets to the remote destination with increasing TTL (Time To Live) value (starting at 1). The TTL field is a field in the IP packet which gets decreased by one at every router. Once the TTL hits zero, the packet gets discarded and a "TTL exceeded" ICMP message is returned to the sender. This approach is used to avoid routing loops; packets cannot loop continuously because the TTL field will eventually decrement to 0. By default the OS sets the TTL value to a high value (64, 128, 255 or similar), so this should only ever be reached in abnormal situations.

  So traceroute sends packets first with TTL value of 1, then TTL value of 2, etc., causing these packets to expire at the first/second/etc. router in the path. It then takes the source IP/host of the ICMP TTL exceeded message returned to show the name/IP of the intermediate hop. Once the TTL is high enough, the packet reaches the destination, and the destination responds.

  The type of packet sent varies by implementation. Under Linux, UDP packets are sent to a high, unused port. So the final destination responds with an ICMP Port Unreachable. Windows and the mtr tool by default use ICMP echo requests (like ping), so the final destinations answers with an ICMP echo reply.
  Let's try it out by setting up a traceroute on one of your virtual machines.

  For this step ssh in to the VMs.
  Install these performance tools in the SSH window:

  <code><br />sudo apt-get update
  <br />sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege
  <br />traceroute www.icann.org<br /></code>

  Now try a few other destinations and also from other sources:

  VMs in the same region or another region (eu1-vm, asia1-vm, w2-vm)
  www.wikipedia.org
  www.adcash.com
  bad.horse (works best if you increase max TTL, so traceroute -m 255 bad.horse)
  Anything else you can think of
  To stop traceroute, Ctrl-c in the SSH window and return to the command line.


  <h2>Use iperf to test performance</h2>

<h3>Between two hosts</h3>



When you use iperf to test the performance between two hosts, one side needs to be set up as the iperf server to
accept connections.

Important:The following commands transfer Gigabytes of traffic between regions, which is charged at Internet egress rates.
Be mindful of this when using them. If you are not on a whitelisted project, or in the free trial, you might want to skip,
or only skim. (Costs should be less than $1 USD.)

Try a very simple test:

SSH into the VM and install the performance tools:

<code><br />sudo apt-get update

<br />sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege<br /></code>

SSH into other VMs (will be used a server) and run:

<code><br />iperf -s #run in server mode<br /></code>

On first VM (will be used as a Client) run this iperf:

<code><br />iperf -c us-test-01 #run in client mode, connection to eu1-vm<br /></code>

You will see some output like this:
<code>
<br />------------------------------------------------------------
<br />Client connecting to eu-vm, TCP port 5001
<br />TCP window size: 45.0 KByte (default)
<br />------------------------------------------------------------<br />
</code>

On europe-test-01 use Ctrl-c to exit the server side when you're done.

<code><br />[  3] local 10.20.0.2 port 35923 connected with 10.30.0.2 port 5001
<br />[ ID] Interval       Transfer     Bandwidth
<br />[  3]  0.0-10.0 sec   298 MBytes   249 Mbits/sec<br /></code>


  <h3>Between VMs within a region</h3>



  Now you'll deploy one instance (ex. us-test-01)in one zone and another inatnce in a different zone (ex.us-test-02).
  You will see that within a region, the bandwidth is limited by the 2 Gbit/s per core egress cap.

  In Cloud Shell, create us-test-02:

  <code><br />gcloud compute instances create us-test-02 \
  <br />--subnet subnet-us-central \
  <br />--zone us-central1-b \
  <br />--tags ssh,http<br /></code>

  SSH to us-test-02 and install performance tools:

  <code><br />sudo apt-get update

  <br />sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege <br /></code>

  Between regions you reach much lower limits, mostly due to limits on TCP window size and single stream performance.
  You can increase bandwidth between hosts by using other parameters, like UDP.

  On europe-test-01 run:

  <code><br />iperf -s -u #iperf server side<br /></code>
  On us-test-01 run:

  <code><br />iperf -c europe-test-01 -u -b 2G #iperf client side - send 2 Gbits/s<br /></code>

  This should be able to achieve a higher speed between EU and US.
  Even higher speeds can be achieved by running a bunch of TCP iperfs in parallel. Let's test this.

  In the SSH window for us-test-01 run:

  <code><br />iperf -s<br /></code>
  In the SSH window for us-test-02 run:

  <code><br />iperf -c us-test-01 -P 20<br /></code>

  The combined bandwidth should be really close to the maximum achievable bandwidth.

  Test a few more combinations. If you use Linux on your laptop you can test against your laptop as well. (You can also try iperf3 which is available for many OSes, but this is not part of the lab.)

  As you can see, to reach the maximum bandwidth, just running a single TCP stream (for example, file copy) is not sufficient; you need to have several TCP sessions in parallel. Reasons are: TCP parameters such as Window Size; and functions such as Slow Start. See TCP/IP Illustrated for excellent information on this and all other TCP/IP topics. Tools like bbcp can help to copy files as fast as possible by parallelizing transfers and using configurable window size.

  Optional:
  If you have large enough quota, spin up some 2/4/8/16 core VMs in the lab network,
  install iperf, and see what performance you can reach. Where is the limit?



      </div>
    );
  }
}


export default Performance;
