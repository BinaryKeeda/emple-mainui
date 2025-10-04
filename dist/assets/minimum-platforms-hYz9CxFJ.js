const t="Minimum Platforms",e="Given arrival and departure times of trains at a station, determine the minimum number of platforms required so that no train waits.",n={difficulty:"Medium",tags:["Greedy","Sorting","Two Pointers","Timeline Simulation"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},r=[{category:"Brute Force",algorithm:"Timeline Simulation (Time Bucket Counting)",description:"Simulate every minute from the earliest arrival to the latest departure and count how many trains are present at each minute to track the maximum overlap.",steps:["Find the minimum arrival time and maximum departure time.","Create a timeline array for every minute in the range.","For each train, increment the count in the timeline for every minute between arrival and departure.","Return the maximum count in the timeline, representing the peak number of platforms needed."],time_complexity:"O(n × T)",space_complexity:"O(T)",code:{java:`import java.util.*;
class Solution {
  static int findPlatform(int arr[], int dep[]) {
    int minTime = Arrays.stream(arr).min().getAsInt();
    int maxTime = Arrays.stream(dep).max().getAsInt();
    int[] timeline = new int[maxTime - minTime + 2];
    for (int i = 0; i < arr.length; i++) {
      for (int t = arr[i]; t <= dep[i]; t++) {
        timeline[t - minTime]++;
      }
    }
    return Arrays.stream(timeline).max().getAsInt();
  }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;
class Solution {
public:
  int findPlatform(vector<int>& arr, vector<int>& dep) {
    int min_time = *min_element(arr.begin(), arr.end());
    int max_time = *max_element(dep.begin(), dep.end());
    vector<int> timeline(max_time - min_time + 2, 0);
    for (int i = 0; i < arr.size(); i++) {
      for (int t = arr[i]; t <= dep[i]; t++) {
        timeline[t - min_time]++;
      }
    }
    return *max_element(timeline.begin(), timeline.end());
  }
}`}},{category:"Optimal",algorithm:"Event-Based Counting (Two Pointer Technique)",description:"Sort arrival and departure times, and use two pointers to simulate trains arriving and leaving. Increment platform count on arrival, decrement on departure, and track the maximum.",steps:["Sort both arrival and departure arrays.","Initialize two pointers `i` and `j` at 0, and counters for current and max platforms.","While there are trains left:","- If next train arrives before or at the same time as a departure: increment platform count and move arrival pointer.","- Else: decrement platform count and move departure pointer.","Track the maximum platforms needed during the simulation."],time_complexity:"O(n log n)",space_complexity:"O(1)",code:{java:`import java.util.*;
class Solution {
  static int findPlatform(int arr[], int dep[]) {
    Arrays.sort(arr);
    Arrays.sort(dep);
    int platforms = 1, maxPlatforms = 1;
    int i = 1, j = 0, n = arr.length;
    while (i < n && j < n) {
      if (arr[i] <= dep[j]) {
        platforms++;
        maxPlatforms = Math.max(maxPlatforms, platforms);
        i++;
      } else {
        platforms--;
        j++;
      }
    }
    return maxPlatforms;
  }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;
class Solution {
public:
  int findPlatform(vector<int>& arr, vector<int>& dep) {
    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());
    int platforms = 1, max_platforms = 1;
    int i = 1, j = 0, n = arr.size();
    while (i < n && j < n) {
      if (arr[i] <= dep[j]) {
        platforms++;
        max_platforms = max(max_platforms, platforms);
        i++;
      } else {
        platforms--;
        j++;
      }
    }
    return max_platforms;
  }
}`}}],a=[{input:{arrival:[800,815,830,845],departure:[830,845,900,915]},output:2,explanation:"Between 8:15 and 8:30 AM, two trains are at the station, so 2 platforms are needed."},{input:{arrival:[1e3,1030,1100],departure:[1030,1100,1130]},output:1,explanation:"Each train departs before the next one arrives, so only 1 platform is sufficient."},{input:{arrival:[700,730,800,830],departure:[900,900,900,900]},output:4,explanation:"All trains overlap during 8:30–9:00 AM, requiring 4 platforms."}],i={"1 <= n <= 100000":!0,"0000 <= arr[i], dep[i] <= 2359":!0},o=[{input:{arrival:[1e3],departure:[1030]},output:1,reason:"Single train needs only one platform."},{input:{arrival:[100,100,100],departure:[200,200,200]},output:3,reason:"All trains arrive and stay at the same time, requiring separate platforms."}],m=[{id:"tc1",input:{arrival:[900,940,950,1100,1500,1800],departure:[910,1200,1120,1130,1900,2e3]},expected_output:3},{id:"tc2",input:{arrival:[900,940],departure:[910,950]},expected_output:2}],s={"24_hour_format":"Ensure the input times are in 24-hour format without colon, e.g. 900 = 9:00 AM, 1430 = 2:30 PM.",platform_rule:"A single platform can serve only one train at any moment.",sorting_key:"The optimal solution relies on sorting arrival and departure arrays for linear simulation."},l=["Try sorting both arrays to reduce nested loops.","Can you simulate the timeline with a single pass?","Track how the platform count increases or decreases with each event."],u=["What if there are multiple stations?","Can you return not just the count, but exact platform assignments?","What if train delays dynamically update arrival or departure?"],p=["Greedy","Sorting","Two Pointers","Interval Overlap","Train Scheduling"],d={title:t,description:e,metadata:n,approaches:r,examples:a,constraints:i,edge_cases:o,test_cases:m,notes:s,hints:l,follow_up:u,tags:p};export{r as approaches,i as constraints,d as default,e as description,o as edge_cases,a as examples,u as follow_up,l as hints,n as metadata,s as notes,p as tags,m as test_cases,t as title};
