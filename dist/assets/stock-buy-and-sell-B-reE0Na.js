const i="Stock Buy and Sell",t="Given an array where each element represents the stock price on a given day, determine the maximum profit you can make by buying and then later selling one share. Return 0 if no profit is possible.",e={difficulty:"Easy",tags:["Array","Greedy","Brute Force","Optimization"],author:"Vaibhav Chauhan",created_at:"2025-07-09",updated_at:"2025-07-09",source:"BinaryKeeda DSA Sheet"},n=[{category:"Brute Force",algorithm:"Nested Loops for All Pairs",description:"Try every possible pair of buy and sell days and calculate the profit. Track the maximum profit found.",steps:["Initialize max_profit = 0.","Iterate through all days i (as the buy day).","For each i, iterate through all future days j > i (as the sell day).","Calculate profit = stock_prices[j] - stock_prices[i].","Update max_profit if profit > max_profit.","Return max_profit."],time_complexity:"O(n^2)",space_complexity:"O(1)",code:{java:`class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                int profit = prices[j] - prices[i];
                if (profit > maxProfit) {
                    maxProfit = profit;
                }
            }
        }
        return maxProfit;
    }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int max_profit = 0;
        for (int i = 0; i < prices.size(); i++) {
            for (int j = i + 1; j < prices.size(); j++) {
                int profit = prices[j] - prices[i];
                if (profit > max_profit) {
                    max_profit = profit;
                }
            }
        }
        return max_profit;
    }
};`}},{category:"Optimal Approach",algorithm:"Track Minimum Price and Maximum Profit",description:"Iterate through the prices, track the minimum price so far and calculate profit for each day. Update the maximum profit accordingly.",steps:["Initialize max_profit = 0 and min_price = stock_prices[0].","Iterate from day 1 to end of array.","Update min_price if current price is lower.","Calculate profit = current price - min_price.","Update max_profit if profit > max_profit.","Return max_profit."],time_complexity:"O(n)",space_complexity:"O(1)",code:{java:`class Solution {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) return 0;
        int maxProfit = 0;
        int minPrice = prices[0];
        for (int i = 1; i < prices.length; i++) {
            minPrice = Math.min(minPrice, prices[i]);
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
        return maxProfit;
    }
}`,cpp:`#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        int max_profit = 0;
        int min_price = prices[0];
        for (int i = 1; i < prices.size(); i++) {
            min_price = min(min_price, prices[i]);
            max_profit = max(max_profit, prices[i] - min_price);
        }
        return max_profit;
    }
};`}}],r=[{input:[10,2,8,1,5,9],output:7,explanation:"Buy on day 1 (price = 2), sell on day 5 (price = 9), profit = 7."},{input:[9,7,5,3,1],output:0,explanation:"Prices always drop, no profit possible."},{input:[3,3,3,3,3],output:0,explanation:"Prices remain constant, no profit opportunity."}],a={"1 <= n <= 100000":!0,"0 <= stock_prices[i] <= 100000":!0},o=[{input:[5],output:0,reason:"Only one price available; cannot perform buy and sell."},{input:[],output:0,reason:"Empty array; no transactions possible."},{input:[1,1e5],output:99999,reason:"Maximum profit achievable in just two days."}],p=[{id:"tc1",input:[7,1,5,3,6,4],expected_output:5},{id:"tc2",input:[7,6,4,3,1],expected_output:0}],c={observation:"The key idea is to always try to find the lowest price seen so far and check if current price - min_price is a better profit.",optimization_note:"Avoid unnecessary comparisons of all pairs using the optimal linear scan."},s=["Try to find the lowest price before each day to maximize profit.","Can you do this in one pass while tracking min price?","Don't try all pairs; think greedily."],l=["What if you're allowed to make multiple buy-sell transactions?","What if there's a cooldown period after selling before you can buy again?","What if transaction fees are involved?"],u=["Greedy","Array","Optimization","Brute Force","One-Pass"],m={title:i,description:t,metadata:e,approaches:n,examples:r,constraints:a,edge_cases:o,test_cases:p,notes:c,hints:s,follow_up:l,tags:u};export{n as approaches,a as constraints,m as default,t as description,o as edge_cases,r as examples,l as follow_up,s as hints,e as metadata,c as notes,u as tags,p as test_cases,i as title};
