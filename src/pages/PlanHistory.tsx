import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Package,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Crown,
  Star,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlan } from "../features/package/packagesSlice";

const PlanHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { planData, loading, error } = useSelector((state) => state.packages);
  // console.log("sksksksksksk", planData);
  const { profile: UserProfile } = useSelector(
    (state: { auth: ProfileState }) => state.auth
  );
  const userId = UserProfile ? UserProfile.id : null;
  // console.log("object", userId);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token"); // read token inside effect
    if (token && userId) {
      dispatch(fetchPlan({ token, id: userId }));
    }
  }, [dispatch, userId]); // only depend on dispatch and userId

  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <Badge
        className="bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-200 cursor-default"
      >
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
      
      );
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400"
        >
          <XCircle className="w-3 h-3 mr-1" />
          Expired
        </Badge>
      );
    }
  };

  const getPlanIcon = (planName: string) => {
    switch (planName?.toLowerCase()) {
      case "pro plan":
        return <Crown className="w-5 h-5 text-amber-500" />;
      case "basic plan":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "premium plan":
        return <Star className="w-5 h-5 text-purple-500" />;
      default:
        return <Zap className="w-5 h-5 text-primary" />;
    }
  };

  const calculateDaysRemaining = (endDate: string, status: number) => {
    if (status === 0) return 0;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="container mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Plan History</h1>
          <p className="text-muted-foreground">
            View your subscription history and plan details
          </p>
        </div>
      </div>

      {/* Plan History List */}
      <Card className="overflow-hidden">
        {/* <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Subscription History
          </CardTitle>
          <CardDescription>
            Your complete plan purchase and subscription history
          </CardDescription>
        </CardHeader> */}
        <CardContent className="p-0">
          <div className="divide-y">
            {planData.map((plan, index) => (
              <div
                key={plan._id}
                className="p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getPlanIcon(plan.packageId.packageName)}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {plan.packageId.packageName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.packageId.packageDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(plan.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">{plan.day} days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Messages</p>
                      <p className="font-medium">
                        {plan?.packageId?.msgCount?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Templates</p>
                      <p className="font-medium">
                        {plan.packageId.templateCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Days Left</p>
                      <p className="font-medium">
                        {plan.status === 1
                          ? `${calculateDaysRemaining(
                              plan.endDate,
                              plan.status
                            )}`
                          : "0"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Purchased</p>
                      <p className="font-medium">
                        {formatDate(plan.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      <strong>Start:</strong> {formatDate(plan.startDate)}
                    </span>
                    <span className="text-muted-foreground">
                      <strong>End:</strong> {formatDate(plan.endDate)}
                    </span>
                  </div>
                  {plan.status === 1 && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600 border-green-200"
                    >
                      {calculateDaysRemaining(plan.endDate, plan.status)} days
                      remaining
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {planData.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="mb-2">No Plan History</CardTitle>
        
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlanHistory;
