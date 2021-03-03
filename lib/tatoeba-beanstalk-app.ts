import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as apiGateway from "@aws-cdk/aws-apigatewayv2";
import * as eb from "@aws-cdk/aws-elasticbeanstalk";
import * as s3assets from "@aws-cdk/aws-s3-assets";

import * as path from "path";

export class TatoebaBeanstalkApp extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new eb.CfnApplication(this, "Application", {
      applicationName: "dotnet-core-app",
    });

    const elbZipArchive = new s3assets.Asset(this, "MyElbAppZip", {
      path: `fix`,
    });

    const appVersionProps = new eb.CfnApplicationVersion(this, "AppVersion", {
      applicationName: "Tatoeba Sync",
      sourceBundle: {
        s3Bucket: elbZipArchive.s3BucketName,
        s3Key: elbZipArchive.s3ObjectKey,
      },
    });

    const elbEnv = new eb.CfnEnvironment(this, "Environment", {
      environmentName: "dotnet-core-env",
      applicationName: app.applicationName ?? "DotnetAppEnvName",
      solutionStackName: "64bit Amazon Linux 2 v2.1.2 running .NET Core",
      versionLabel: appVersionProps.ref,
    });

    elbEnv.addDependsOn(app);
  }
}
