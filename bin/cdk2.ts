#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Cdk2Stack } from '../lib/cdk2-stack';

const app = new cdk.App();
new Cdk2Stack(app, 'Cdk2Stack');
