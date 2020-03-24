#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ClusterStack } from '../lib/cluster-stack';
import { ContainerStack } from '../lib/container-stack';
import { CicdForAppStack } from '../lib/cicd-for-app-stack';

const app = new cdk.App();

const environments = [
    { account: '865200059792', region: 'ap-northeast-1' },
    // { account: '865200059792', region: 'us-west-1' },
];

for (const env of environments) {
    const clusterStack = new ClusterStack (app, `v2-ClusterStack-${env.region}`, { env });
    const containerStack = new ContainerStack (app, `v2-ContainerStack-${env.region}`, { env, cluster: clusterStack.cluster, asg: clusterStack.asg});
    // containerStack.addDependency(clusterStack);

    const cicdStack = new CicdForAppStack (app, `CicdForAppStack`, { env, cluster: clusterStack.cluster, asg: clusterStack.asg});
}
